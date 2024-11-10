import { QuerySelector } from '../../commands';
import innerType from '../select/innerType';

function C(): QuerySelector {
	return innerType.C();
}

function cpp(): QuerySelector {
	//todo: add the types
	return innerType.cpp();
}
function csharp(): QuerySelector {
	return innerType.csharp();
}
function go(): QuerySelector {
	return innerType.go();
}
function java(): QuerySelector {
	return innerType.java();
}

function rust(): QuerySelector {
	return innerType.rust();
}

function typescript(): QuerySelector {
	return innerType.typescript();
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	rust,
	typescript,
};
