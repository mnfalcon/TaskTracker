package com.user.appuser;

import com.user.security.JWTAuthorizationFilter;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {
    private static final String USER_NOT_FOUND_MSG = "User %s not found";
    private final UserRepository appUserRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private JWTAuthorizationFilter jwtAuthorizationFilter;


    public AppUser signUpUser(AppUser user){
        boolean userExists = appUserRepository.findByUsername(user.getUsername()).isPresent();
        if (userExists){
            throw new IllegalStateException("Username already exists.");
        }

//        String encodedPassword = passwordEncoder.encode(user.getPassword());

//        user.setPassword(encodedPassword);
        appUserRepository.save(user);
        user.setPassword("");
        String token = jwtAuthorizationFilter.getJWTToken(user.getUsername());
        user.setToken(token);

        return user;
    }

    public AppUser login(String username, String password){
        Optional<AppUser> optUser = appUserRepository.findByUsername(username);
        if (!optUser.isPresent()){
            throw new IllegalStateException("Username does not exist");
        }
        AppUser user = optUser.get();

        if (!user.getPassword().equals(password)){
            System.out.println(user.getPassword());
            System.out.println(password);
            throw new IllegalStateException("Password is incorrect");
        }
        String token = jwtAuthorizationFilter.getJWTToken(username);
        user.setToken(token);
        user.setPassword("");
        return user;
    }

//    private String getJWTToken(String username) {
//        String secretKey = "mySecretKey";
//        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
//                .commaSeparatedStringToAuthorityList("ROLE_USER");
//
//        String token = Jwts
//                .builder()
//                .setId(username)
//                .setSubject(username)
//                .claim("authorities",
//                        grantedAuthorities.stream()
//                                .map(GrantedAuthority::getAuthority)
//                                .collect(Collectors.toList()))
//                .signWith(key)
//                .compact();
//
//        return "Bearer " + token;
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return appUserRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, username)));
    }
}
