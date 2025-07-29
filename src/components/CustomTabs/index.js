import React from 'react';
import {Tabs, Tab, TabButton, TabText, UndelineTab} from './styles';

const CustomTabs = ({activeTab, goToPage, tabs, scrollValue}) => {
	return (
		<Tabs>
			{tabs.map((name, page) => (
				<Tab key={name}>
					<TabButton onPress={() => goToPage(page)}>
						<TabText active={activeTab === page}>{name}</TabText>
						{activeTab === page && <UndelineTab marginSize={50} />}
					</TabButton>
				</Tab>
			))}
		</Tabs>
	);
};

export default CustomTabs;
