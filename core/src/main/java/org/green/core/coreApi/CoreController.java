package org.green.core.coreApi;

import org.green.core.model.response.CoreResponse;
import org.springframework.web.bind.annotation.*;

public interface CoreController {
    @PostMapping("/create")
    CoreResponse create();

    @PutMapping("/edit/{id}")
    CoreResponse update(@PathVariable int id);

    @DeleteMapping("/delete/{id}")
    CoreResponse delete(@PathVariable int id);

    @GetMapping("/{id}")
    CoreResponse getById(@PathVariable int id);
}
