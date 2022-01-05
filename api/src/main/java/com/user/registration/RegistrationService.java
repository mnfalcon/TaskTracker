package com.user.registration;

import com.user.appuser.AppUser;
import com.user.appuser.AppUserService;
import com.user.appuser.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService userService;
    private final UserRepository userRepository;

    public String register(RegistrationRequest request){
        boolean usernameExists = userRepository.findByUsername(request.getUsername()).isPresent();
        if (usernameExists){
            throw new IllegalStateException("Username already exists");
        }
        return userService.signUpUser(
                new AppUser(
                    request.getUsername(),
                        request.getEmail(),
                        request.getPassword()
                )
        );
    }
}
