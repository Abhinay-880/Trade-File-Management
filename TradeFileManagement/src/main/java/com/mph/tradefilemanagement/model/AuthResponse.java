package com.mph.tradefilemanagement.model;

public class AuthResponse {
	private String jwt;

	public String getJwt() {
		return jwt;
	}

	public AuthResponse(String jwt) {
		this.jwt = jwt;
	}

}
