import React from 'react';
//FC = function component

interface HeaderProps {
    title: string;
    // ? no final da variável para não-obrigatorio
}

const Header: React.FC<HeaderProps> = (props) => {
    return(
        <header>
            <h1>{props.title}</h1>
        </header>
    );
}

export default Header;