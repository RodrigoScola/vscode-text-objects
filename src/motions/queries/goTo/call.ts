import { QuerySelector } from '../../commands';
import call from '../select/call';

function C(): QuerySelector {
	return call.C();
}

function cpp(): QuerySelector {
	return call.cpp();
}
function csharp(): QuerySelector {
	return call.csharp();
}
function go(): QuerySelector {
	return call.go();
}
function java(): QuerySelector {
	return call.java();
}
function javascript(): QuerySelector {
	return call.javascript();
}

function lua(): QuerySelector {
	return call.lua();
}

function python(): QuerySelector {
	return call.python();
}
function rust(): QuerySelector {
	return call.rust();
}

function toml(): QuerySelector {
	return call.toml();
}

function typescript(): QuerySelector {
	return call.typescript();
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	toml,
	lua,
	python,
	rust,
	typescript,
};
