import { QuerySelector } from '../../commands';
import classSelector from '../select/class';

function C(): QuerySelector {
	return classSelector.C();
}

function cpp(): QuerySelector {
	return classSelector.cpp();
}
function csharp(): QuerySelector {
	return classSelector.csharp();
}
function go(): QuerySelector {
	return classSelector.go();
}
function java(): QuerySelector {
	return classSelector.java();
}
function javascript(): QuerySelector {
	return classSelector.javascript();
}

function python(): QuerySelector {
	return classSelector.python();
}
function rust(): QuerySelector {
	return classSelector.rust();
}

function toml(): QuerySelector {
	return classSelector.toml();
}

function typescript(): QuerySelector {
	return classSelector.typescript();
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	toml,
	python,
	rust,
	typescript,
};
