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
    public AppUser login(@RequestBody AppUserLoginRequest request) {
        return appUserService.login(request.getUsername(), request.getPassword());
    }


}
