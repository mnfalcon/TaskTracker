package com.user.appuser;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;

@Getter @AllArgsConstructor
@ToString
public class RegistrationRequest {
    private final String username;
    private final String password;
    @Column(nullable = true)
    private final String email;
}
