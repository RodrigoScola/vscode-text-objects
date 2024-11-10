import { QuerySelector } from '../../commands';
import array from '../select/Array';

function C(): QuerySelector {
	return array.C();
}

function cpp(): QuerySelector {
	return array.cpp();
}
function csharp(): QuerySelector {
	return array.csharp();
}
function go(): QuerySelector {
	return array.go();
}
function java(): QuerySelector {
	return array.java();
}
function javascript(): QuerySelector {
	return array.javascript();
}

function json(): QuerySelector {
	return array.json();
}

function lua(): QuerySelector {
	return array.lua();
}

function python(): QuerySelector {
	return array.python();
}
function rust(): QuerySelector {
	return array.rust();
}

function toml(): QuerySelector {
	return array.toml();
}

function typescript(): QuerySelector {
	return array.typescript();
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
