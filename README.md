A native Android module that renders LaTeX mathematical expressions using **jlatexmath-android**.

## Architecture Decisions

### Native Rendering
- Uses `jlatexmath-android` library (Android port of JLaTeXMath)
- Renders LaTeX directly to Android `Drawable` via `JLatexMathDrawable`
- Custom `LaTeXView` extends `AppCompatImageView` for displaying rendered expressions

### Component Structure

React Native (TypeScript)->
LaTeXRenderer component->
LaTeXViewManager (ViewManager)->
LaTeXView (Custom Android View)->
JLatexMathDrawable → Native Rendering

### Data Flow
1. **JavaScript → Native**: 
   - React component passes `latex` string prop
   - Props flow through ViewManager's `@ReactProp` annotation
   - ViewManager calls `setLatex()` on native View

2. **Native Processing**:
   - `LaTeXView` receives LaTeX string
   - Creates `JLatexMathDrawable` with text size, padding, and alignment
   - Sets drawable on ImageView for display


### Rendering Strategy
- **Direct rendering**: JLatexMathDrawable renders to View
- **Lightweight**: Each view is just an ImageView with a Drawable

### Thread Model
- Rendering happens on **UI thread** (required by Android View system)
- Non-blocking: doesn't freeze JavaScript thread
- React Native bridge handles threading automatically

## Running the App

```bash
npm install
npm run android
```

## Features
- Native LaTeX rendering
- 30 test expressions (various mathematical formulas)
- Input validation with error handling
- Toggle between input and testing modes
