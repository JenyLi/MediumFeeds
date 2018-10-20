import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';

export default function ({ feeds, submitQuery }) {
    return (
        <Box align="center" pad="medium">
            <Heading>Recommended publications:</Heading>
            <Tiles colorIndex="light-1" fill={true} flush={false} pad="medium">
            {feeds.map((item, i) => {
                return (
                    <Tile colorIndex="light-2" key={i}>
                        <Card
                            label={item.category}
                            heading={item.title}
                            onClick={() => submitQuery(item.query)}
                        />
                    </Tile>
                );
            })}
            </Tiles>
        </Box>
    );
}
