import { QuerySelector } from '../../commands';
import comments from '../select/comment';

function C(): QuerySelector {
	return comments.C();
}

function cpp(): QuerySelector {
	return comments.cpp();
}
function csharp(): QuerySelector {
	return comments.csharp();
}
function go(): QuerySelector {
	return comments.go();
}
function java(): QuerySelector {
	return comments.java();
}
function javascript(): QuerySelector {
	return comments.javascript();
}

function json(): QuerySelector {
	return comments.json();
}

function lua(): QuerySelector {
	return comments.lua();
}

function python(): QuerySelector {
	return comments.python();
}
function rust(): QuerySelector {
	return comments.rust();
}

function toml(): QuerySelector {
	return comments.toml();
}

function typescript(): QuerySelector {
	return comments.typescript();
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
