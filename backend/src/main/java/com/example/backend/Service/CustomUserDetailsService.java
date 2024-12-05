package com.example.backend.Service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("user".equals(username)) {
            return new User("user", "$2a$10$RDXSOAq6GKgD1OrOCeBs.uRMfnQsZyoBLvDWyyfTOUt/sOpryWeQm", new ArrayList<>());
        }
        throw new UsernameNotFoundException("User not found");
    }
}