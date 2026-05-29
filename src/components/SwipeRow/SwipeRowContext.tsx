import React, {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useRef,
	type ReactNode,
} from 'react';

export interface SwipeRowHandle {
	openRight: () => void;
	close: () => void;
}

interface SwipeRowContextValue {
	register: (key: string, handle: SwipeRowHandle) => () => void;
	openRight: (key: string) => void;
	notifyOpen: (key: string) => void;
	notifyClose: (key: string) => void;
}

const SwipeRowContext = createContext<SwipeRowContextValue | null>(null);

export function SwipeRowProvider({ children }: { children: ReactNode }) {
	const rowsRef = useRef(new Map<string, SwipeRowHandle>());
	const openKeyRef = useRef<string | null>(null);

	const closeOpenRow = useCallback((exceptKey?: string) => {
		const currentKey = openKeyRef.current;
		if (!currentKey || currentKey === exceptKey) {
			return;
		}

		rowsRef.current.get(currentKey)?.close();
		openKeyRef.current = null;
	}, []);

	const register = useCallback((key: string, handle: SwipeRowHandle) => {
		rowsRef.current.set(key, handle);

		return () => {
			rowsRef.current.delete(key);
			if (openKeyRef.current === key) {
				openKeyRef.current = null;
			}
		};
	}, []);

	const openRight = useCallback(
		(key: string) => {
			closeOpenRow(key);
			rowsRef.current.get(key)?.openRight();
			openKeyRef.current = key;
		},
		[closeOpenRow],
	);

	const notifyOpen = useCallback(
		(key: string) => {
			closeOpenRow(key);
			openKeyRef.current = key;
		},
		[closeOpenRow],
	);

	const notifyClose = useCallback((key: string) => {
		if (openKeyRef.current === key) {
			openKeyRef.current = null;
		}
	}, []);

	const value = useMemo(
		() => ({
			register,
			openRight,
			notifyOpen,
			notifyClose,
		}),
		[register, openRight, notifyOpen, notifyClose],
	);

	return (
		<SwipeRowContext.Provider value={value}>{children}</SwipeRowContext.Provider>
	);
}

export function useSwipeRowRegistry() {
	const context = useContext(SwipeRowContext);

	if (!context) {
		throw new Error('useSwipeRowRegistry must be used within SwipeRowProvider');
	}

	return context;
}
