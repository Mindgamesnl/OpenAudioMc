package com.craftmend.openaudiomc.generic.networking.rest.interfaces;

import com.craftmend.openaudiomc.generic.networking.rest.data.RestErrorResponse;
import com.craftmend.openaudiomc.generic.networking.rest.data.RestSuccessResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GenericApiResponse<R extends AbstractRestResponse> {

    private List<RestErrorResponse> errors;
    private List<RestSuccessResponse<R>> responses;

}
