package com.finallatex;

import android.content.Context;
import android.graphics.Color;
import androidx.appcompat.widget.AppCompatImageView;
import ru.noties.jlatexmath.JLatexMathDrawable;

public class LaTeXView extends AppCompatImageView {
    
    private String latex = "";
    
    public LaTeXView(Context context) {
        super(context);
        setScaleType(ScaleType.FIT_CENTER);
    }
    
    public void setLatex(String latexString) {
        if (latexString == null || latexString.isEmpty()) {
            setImageDrawable(null);
            return;
        }
        
        this.latex = latexString;
        renderLatex();
    }
    
    private void renderLatex() {
        try {
            JLatexMathDrawable drawable = JLatexMathDrawable.builder(latex)
                    .textSize(40)
                    .padding(16, 16, 16, 16)
                    .background(Color.TRANSPARENT)
                    .align(JLatexMathDrawable.ALIGN_CENTER)
                    .build();
            
            setImageDrawable(drawable);
        } catch (Exception e) {
            setImageDrawable(null);
        }
    }
}
