package com.craftmend.openaudiomc.generic.networking.addapter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GenericApiResponse {

    private List<RestErrorResponse> errors;
    private List<RestDataResponse> data;

}
