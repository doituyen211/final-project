package org.green.core.model.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class CoreResponse {
    private int code;
    private String message;
    public Object data;
}
