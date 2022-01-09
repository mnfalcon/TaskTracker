package com.user.appuser;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
@RequestMapping
public class AppUserController {

    private final AppUserService appUserService;
    private final UserRepository userRepository;

    @PostMapping("/api/login")
    public LoginResponse login(@RequestBody AppUserLoginRequest request) {
        return appUserService.login(request.getUsername(), request.getPassword());
    }

    @PostMapping("/api/register")
    public LoginResponse register(@RequestBody RegistrationRequest request){
        return appUserService.signUpUser( new AppUser(request.getUsername(), request.getEmail(),request.getPassword()));
    }


}
