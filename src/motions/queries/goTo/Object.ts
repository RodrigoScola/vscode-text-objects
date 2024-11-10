import { QuerySelector } from '../../commands';
import objects from '../select/Object';

function C(): QuerySelector {
	return objects.C();
}

function cpp(): QuerySelector {
	return objects.cpp();
}
function csharp(): QuerySelector {
	return objects.csharp();
}
function go(): QuerySelector {
	return objects.go();
}
function java(): QuerySelector {
	return objects.java();
}
function javascript(): QuerySelector {
	return objects.javascript();
}

function json(): QuerySelector {
	return objects.json();
}

function lua(): QuerySelector {
	return objects.lua();
}

function python(): QuerySelector {
	return objects.python();
}
function rust(): QuerySelector {
	return objects.rust();
}

function toml(): QuerySelector {
	return objects.toml();
}

function typescript(): QuerySelector {
	return objects.typescript();
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	json,
	toml,
	lua,
	python,
	rust,
	typescript,
};
