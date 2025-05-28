package com.mph.tradefilemanagement.model;

import jakarta.validation.constraints.NotNull;

public class AuthRequest {
	@NotNull(message = "Username should not be empty")
	private String username;
	@NotNull(message = "Password should not be empty")
	private String password;
	private String role;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
