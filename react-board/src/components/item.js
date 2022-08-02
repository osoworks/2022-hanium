import React, { useState } from 'react';

function Item({item}) {
    return(
        <div className="div">
            <span>{item.id}</span>
            <span className="title">{item.title}</span>
            <span>{item.createdAt}</span>
        </div>
    );
}

export default Item;