package com.user.registration;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter @AllArgsConstructor
@ToString
public class RegistrationRequest {
    private final String username;
    private final String password;
    private final String email;
}
