import React, { useState } from 'react';
import Item from './item';

function List({items}) {
    return (
        <div>
            {
                item.map((item) => <Item item = {item}/>)
            }
        </div>
    );
}

export default List;