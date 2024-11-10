import { QuerySelector } from '../../commands';
import vars from '../select/Variables';

function C(): QuerySelector {
	return vars.C();
}

function cpp(): QuerySelector {
	return vars.cpp();
}
function csharp(): QuerySelector {
	return vars.csharp();
}
function go(): QuerySelector {
	return vars.go();
}
function java(): QuerySelector {
	return vars.java();
}
function javascript(): QuerySelector {
	return vars.javascript();
}

function json(): QuerySelector {
	return vars.json();
}

function lua(): QuerySelector {
	return vars.lua();
}

function python(): QuerySelector {
	return vars.python();
}
function rust(): QuerySelector {
	return vars.rust();
}

function toml(): QuerySelector {
	return vars.toml();
}

function typescript(): QuerySelector {
	return vars.typescript();
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
