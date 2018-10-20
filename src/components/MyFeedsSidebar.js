import React from 'react';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import CloseIcon from 'grommet/components/icons/base/Close';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';

export default class MyFeedsSidebar extends React.Component {
    render() {
        const { feeds, submitQuery, clearFeedByQuery } = this.props;

        return (
            <Sidebar fixed colorIndex="neutral-4-a">
                <Box pad="medium">
                    <Header>
                        <Title>
                            My feeds
                        </Title>
                    </Header>

                    <List>
                        {feeds.map((query) => {
                            return (
                                <ListItem
                                    key={query}
                                    justify="between"
                                    onClick={() => {
                                        submitQuery(query);
                                    }}
                                >
                                    <span>
                                        {query}
                                    </span>
                                    <span className="secondary">
                                        <CloseIcon
                                            size="xsmall"
                                            colorIndex="accent-2-a"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                clearFeedByQuery(query);
                                            }}
                                        />
                                    </span>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Sidebar>
        );
    }
}
