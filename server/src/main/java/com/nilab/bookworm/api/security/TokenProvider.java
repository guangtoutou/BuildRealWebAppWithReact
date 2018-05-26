package com.nilab.bookworm.api.security;

import com.nilab.bookworm.api.model.ApplicationUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TokenProvider {
	@Value("${app.jwtSecret}")
	private String jwtSecret;

	@Value("${app.jwtExpirationInMs}")
	private int jwtExpirationInMs;

	public TokenProvider() {
	}

	public String generateToken(Object user){
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

		String compactJws = Jwts.builder()
				.claim("user", user)
				.setIssuedAt(new Date())
				.setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();

		return compactJws;
	}
}
