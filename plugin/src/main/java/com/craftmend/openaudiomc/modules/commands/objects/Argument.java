package com.craftmend.openaudiomc.modules.commands.objects;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Argument {

    /**
     * The usage of the command, example if your command name is select and your usage is select name, you would just enter "<name>"
     * description is the text that will be added in the help menu
     */
    private String syntax;
    private String description;

}
