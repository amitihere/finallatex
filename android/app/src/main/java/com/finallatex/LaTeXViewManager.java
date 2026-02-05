package com.finallatex;

import androidx.annotation.NonNull;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class LaTeXViewManager extends SimpleViewManager<LaTeXView> {
    
    public static final String REACT_CLASS = "LaTeXView";
    
    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }
    
    @NonNull
    @Override
    protected LaTeXView createViewInstance(@NonNull ThemedReactContext context) {
        return new LaTeXView(context);
    }
    
    @ReactProp(name = "latex")
    public void setLatex(LaTeXView view, String latex) {
        view.setLatex(latex);
    }
}
