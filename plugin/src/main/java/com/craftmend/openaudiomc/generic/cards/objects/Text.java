package com.craftmend.openaudiomc.generic.cards.objects;

import com.craftmend.openaudiomc.generic.cards.enums.TextStyle;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Text {

    private List<TextStyle> styles = new ArrayList<>();
    private String hyperlink = null;
    @Setter private String text = "";
    @Getter private String id = UUID.randomUUID().toString();

    public Text(String text) {
        this.text = text;
        if (text.length() > 50) throw new IllegalArgumentException("One single text element may not be over 50 characters");
    }

    public Text addStyle(TextStyle style) {
        if (!this.styles.contains(style)) styles.add(style);
        return this;
    }

    public Text setId(String id) {
        if (isAlpha(id)) {
            this.id = id.toLowerCase();
        } else {
            throw new IllegalArgumentException("An id may only be alphabetical text");
        }
        return this;
    }

    private boolean isAlpha(String name) {
        char[] chars = name.toCharArray();

        for (char c : chars) {
            if(!Character.isLetter(c)) {
                return false;
            }
        }

        return true;
    }

    public Text setHyperlink(String hyperlink) {
        this.hyperlink = hyperlink;
        return this;
    }

}
