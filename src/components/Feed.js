import React from 'react';
import { connect } from 'react-redux';
import { getFeedByQuery, clearFeedByQuery, setCurrentQuery } from '../actions/Feed';
import MyFeedsSidebar from './MyFeedsSidebar';
import RecommendedList from './RecommendedList';
import FeedsList from './FeedsList';

import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import CheckBox from 'grommet/components/CheckBox';
import Section from 'grommet/components/Section';
import SearchIcon from 'grommet/components/icons/base/Search';
import Button from 'grommet/components/Button';
import TextInput from 'grommet/components/TextInput';
import Spinning from 'grommet/components/icons/Spinning';

class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: props.currentQuery,
            showRecommendations: false
        };

        this.submitQuery = this.submitQuery.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getFeedByQuery(this.state.query);
    }

    handleSubmit(e) {
        this.props.getFeedByQuery(this.state.query);

        this.setState({
            showRecommendations: false
        });
    }

    submitQuery(query) {
        this.setState({
            query
        }, () => this.props.getFeedByQuery(query));
    }

    render() {
        let { feedsByQuery, currentQuery, isFeedLoading, recommendedPublications = [] } = this.props;
        let feedsToShow = feedsByQuery[currentQuery] && feedsByQuery[currentQuery]['items'] ? feedsByQuery[currentQuery]['items'] : [];
        let feedInfo = feedsByQuery[currentQuery] && feedsByQuery[currentQuery]['feed'] ? feedsByQuery[currentQuery]['feed'] : {};
        let myFeeds = Object.keys(feedsByQuery);

        return (
            <Split fixed flex="right" className="Feed">
                {(myFeeds.length > 0) &&
                    <MyFeedsSidebar
                        feeds={myFeeds}
                        submitQuery={this.submitQuery}
                        clearFeedByQuery={this.props.clearFeedByQuery}
                    />
                }

                <Section pad="none">
                    <Box align="center" pad="large" colorIndex="light-2">
                        <Heading margin="large">Search for publication or @user</Heading>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            this.handleSubmit();
                        }}>
                            <TextInput
                                placeHolder="Search"
                                value={this.state.query}
                                onSelect={this.handleSubmit}
                                size="xlarge"
                                onDOMChange={(e) => {
                                    this.setState({
                                        query: e.target.value
                                    });
                                }}
                            />
                            <Button icon={<SearchIcon />} onClick={this.handleSubmit} />
                        </form>
                    </Box>
                    {(feedsToShow && feedsToShow.length > 0)&&
                    <Box pad="medium">
                        <CheckBox
                            label='Show recommended'
                            checked={this.state.showRecommendations}
                            onChange={(e) => {
                                this.setState({ showRecommendations: e.target.checked });
                            }}
                        />
                    </Box>
                    }
                    {!isFeedLoading &&
                        <>
                        {(!feedsToShow || !feedsToShow.length) &&
                            <Box align="center" pad="medium">
                                {currentQuery && <Title>No results to show for <i>{currentQuery}</i></Title>}
                            </Box>
                        }
                        {(this.state.showRecommendations || !feedsToShow || !feedsToShow.length) &&
                            <RecommendedList submitQuery={this.submitQuery} feeds={recommendedPublications} />
                        }
                        {feedInfo && feedInfo.title &&
                            <Box pad="large" colorIndex="neutral-4-t">
                                <Card
                                    size="full"
                                    heading={feedInfo.title}
                                    label={feedInfo.author}
                                    description={feedInfo.description}
                                    link={<Anchor href={feedInfo.link} target="_blank" rel="noreferrer noopener" label={`${feedInfo.title}`} />}
                                />
                            </Box>
                        }

                        {(feedsToShow && feedsToShow.length > 0) &&
                            <FeedsList feeds={feedsToShow} />
                        }
                        </>
                    }
                    {isFeedLoading && <Box align="center" pad="large"><Spinning size="xlarge" /></Box>}
                </Section>
            </Split>
        );
    }
}

const mapStateToProps = state => ({
    isFeedLoading: state.feed.get('isFeedLoading'),
    currentQuery: state.feed.get('currentQuery'),
    feedError: state.feed.get('feedError'),
    feedsByQuery: state.feed.get('feedsByQuery').toJS(),
    recommendedPublications: state.feed.get('recommendedPublications').toJS()
});

const mapDispatchToProps = dispatch => ({
    getFeedByQuery: (query) => dispatch(getFeedByQuery(query)),
    clearFeedByQuery: (query) => dispatch(clearFeedByQuery(query)),
    setCurrentQuery: (query) => dispatch(setCurrentQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);