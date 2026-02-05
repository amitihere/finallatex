# LaTeX Renderer for React Native

A native Android module that renders LaTeX mathematical expressions using **jlatexmath-android**.

## Architecture Decisions

### Native Rendering
- Uses `jlatexmath-android` library (Android port of JLaTeXMath)
- Renders LaTeX directly to Android `Drawable` via `JLatexMathDrawable`
- Custom `LaTeXView` extends `AppCompatImageView` for displaying rendered expressions
- No WebView or web-based rendering (MathJax/KaTeX)

### Component Structure
```
React Native (TypeScript)
       ↓
LaTeXRenderer component
       ↓
LaTeXViewManager (ViewManager)
       ↓
LaTeXView (Custom Android View)
       ↓
JLatexMathDrawable → Native Rendering
```

### UI Design
- Black & white minimalist theme
- Toggle between input mode and testing mode (30 expressions)
- Hardcoded validation: LaTeX input must start and end with `$`
- Error handling displays in red text below input

## Native ↔ React Native Boundary

### Data Flow
1. **JavaScript → Native**: 
   - React component passes `latex` string prop
   - Props flow through ViewManager's `@ReactProp` annotation
   - ViewManager calls `setLatex()` on native View

2. **Native Processing**:
   - `LaTeXView` receives LaTeX string
   - Creates `JLatexMathDrawable` with text size, padding, and alignment
   - Sets drawable on ImageView for display

3. **No Callbacks**:
   - Unidirectional data flow (JS → Native only)
   - React controls WHAT to render; native controls HOW
   - No events sent back to JavaScript

### Bridge Components
- **LaTeXView.java**: Native Android View (rendering logic)
- **LaTeXViewManager.java**: ViewManager (exposes view to RN)
- **LaTeXPackage.java**: ReactPackage (registers module)
- **LaTeXRenderer.tsx**: TypeScript wrapper (`requireNativeComponent`)

## Performance Considerations

### Rendering Strategy
- **Direct rendering**: JLatexMathDrawable renders to View without intermediate Bitmap steps
- **No caching**: Simple implementation without LRU cache (can be added if needed)
- **Lightweight**: Each view is just an ImageView with a Drawable

### FlatList Optimization
Testing screen displays 30 expressions efficiently:
- Uses FlatList's built-in virtualization
- Only renders visible items + small buffer
- Minimal memory footprint per item
- Smooth scrolling on most devices

### Thread Model
- Rendering happens on **UI thread** (required by Android View system)
- Non-blocking: doesn't freeze JavaScript thread
- React Native bridge handles threading automatically

### Potential Improvements
- Add LRU cache for repeated expressions
- Implement memoization for input validation
- Use `React.memo()` for FlatList items
- Add lazy loading for testing data

## Running the App

```bash
npm install
npm run android
```

## Features
- Native LaTeX rendering (no web technologies)
- 30 test expressions (various mathematical formulas)
- Input validation with error handling
- Toggle between input and testing modes
- Clean black & white UI
