package com.user.registration;

import com.user.appuser.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/register")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public AppUser register(@RequestBody RegistrationRequest request){

        return registrationService.register(request);
    }
}
