package com.user.appuser;

import lombok.AllArgsConstructor;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppUserService {
    private static final String USER_NOT_FOUND_MSG = "User with email %s not found";
    private final UserRepository appUserRepository;
    //private final BCryptPasswordEncoder passwordEncoder;


    public String signUpUser(AppUser user){
        boolean userExists = appUserRepository.findByEmail(user.getEmail()).isPresent();
        if (userExists){
            throw new IllegalStateException("Email already taken.");
        }

        //String encodedPassword = passwordEncoder.encode(user.getPassword());

        //user.setPassword(encodedPassword);
        appUserRepository.save(user);

        return "User registered successfully.";
    }
}
