package com.craftmend.openaudiomc.generic.media.objects;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OptionalError {

	private boolean error;
    private String message;
	
    public OptionalError(boolean error, String message) {
		
    	this.error = error;
    	this.message = message;
    	
	}

}
