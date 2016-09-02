package com.hyperats.kconf;

import org.kurento.jsonrpc.JsonRpcHandler;
import org.kurento.jsonrpc.server.JsonRpcConfigurer;
import org.kurento.jsonrpc.server.JsonRpcHandlerRegistry;

import com.google.gson.JsonObject;

public class KurentoConferenceServer implements JsonRpcConfigurer {
	private JsonRpcHandler<JsonObject> jsonRpcHandler;

	public void registerJsonRpcHandlers(JsonRpcHandlerRegistry registry) {
		registry.addHandler(jsonRpcHandler, "/room");
	}
}
