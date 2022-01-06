package com.user.appuser;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AppUserLoginRequest {
    private String username, password;
}
