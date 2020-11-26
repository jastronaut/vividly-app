import React, { createContext, useState, ReactNode } from 'react';

type ProfileHeaderContextType = {
	isInfoShowing: boolean;
	toggleInfoShowing: Function;
	setInfoShowing: Function;
};

export const ProfileHeaderContext = createContext<ProfileHeaderContextType>({
	isInfoShowing: false,
	toggleInfoShowing: () => null,
	setInfoShowing: () => null,
});

const ProfileHeaderProvider = ({ children }: { children: ReactNode }) => {
	const [isInfoShowing, setIsInfoShowing] = useState<boolean>(false);

	const toggleInfoShowing = () => {
		setIsInfoShowing((info) => !info);
	};

	const setInfoShowing = (newVal: boolean) => setIsInfoShowing(newVal);

	return (
		<ProfileHeaderContext.Provider
			value={{ isInfoShowing, toggleInfoShowing, setInfoShowing }}>
			{children}
		</ProfileHeaderContext.Provider>
	);
};

export default ProfileHeaderProvider;
