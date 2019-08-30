package com.craftmend.openaudiomc.generic.cards.objects;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class Row {

    private List<Text> textList = new ArrayList<>();

}
