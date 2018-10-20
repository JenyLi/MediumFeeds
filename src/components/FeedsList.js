import React from 'react';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Timestamp from 'grommet/components/Timestamp';
import Anchor from 'grommet/components/Anchor';
import Card from 'grommet/components/Card';

export default function ({ feeds }) {
    return (
        <Tiles colorIndex="light-1" fill={true} flush={false} pad="large">
            {feeds.map((item, i) => {
                return (
                    <Tile colorIndex="light-2" key={i}>
                        <Card
                            colorIndex="light-2"
                            thumbnail={item.thumbnail}
                            size="medium"
                            label={
                                <>
                                    <span>
                                        {item.author}
                                    </span>
                                    <span className="secondary">
                                        <Timestamp value={item.pubDate} fields="date" />
                                    </span>
                                </>
                            }
                            heading={item.title}
                            link={<Anchor href={item.link} target="_blank" rel="noreferrer noopener" label="Read full article" />}
                        />
                    </Tile>
                );
            })}
        </Tiles>
    );
}
