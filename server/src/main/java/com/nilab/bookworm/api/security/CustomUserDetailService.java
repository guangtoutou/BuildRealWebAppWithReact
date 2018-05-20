package com.nilab.bookworm.api.security;

import com.nilab.bookworm.api.model.ApplicationUser;
import com.nilab.bookworm.api.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

		ApplicationUser user = userRepository.findApplicationUserByUsername(s);
		if(user != null){
			return user;
		}
		throw new UsernameNotFoundException(
				"User '" + s + "' not found.");
	}
}
