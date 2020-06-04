import React, { FC, useState } from 'react';
import './board.scss';

const size = 15;

const Cross = () => (
    <img
        alt="cross"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACPElEQVRoge2ZzW7TQBSFzzXd8Ci22bBnU4k1KDMTVZUqkTdp6YoHIVSIxPMCbFkDVZuJWPQB+gSAmtwuiFUTMv6bOyKVfDaRnPHM+TRn4nsdYNCgQYP2XlrrfF/XTJoGGGPOAHzXWp+EmmorY8wYwDet9bumsU8aJjpj5lP8AX2dZdmNc+5SyKdvzTEzfwBwAOBFlmVPnXOffePJ98VoNHqWJMnXzUSl7pj5pCiKj3KWH6SUOiKi99trrtfr59baq133eCNkrb1i5mMAd5XLB0Q0jREnY8x4h/kVEU185oGGCDnnFmmaOiJSeIAVj9NWbEqtiOjNbDab1t1bCwDEhwgxD7QAAOJBhJoHWgIA8hAS5oEOAIAchJR5oCMAEA4haR7oAQD0h5A2D/QEALpDxDAPBAAA7SFimQdqSokuUkoZIrrAlkEAEyL6Fcs8IAQA+OuYzWe0eiooQlU55649carWWysimszn8wupdcUAAO+ZKCUWm6oaG5rOEyaJN5bMLBbZUqI74Pm1KRWlKRIDUEodAZji30O8xt9n4lWapj+cc9cS64pEqK4Zid0UBe9A00Mqdj8RBND2CRsTojdA1/IgFkQvgL61TQyIzgChhZk0RCcAqapSEqI1gHRJLAXRCiBWPS8B0QgQsxkBwiGaXu5GNV8qBOLRv9z17sByubzN8/w3gJebS+LNyLZ2NUXMfG6t/eS7pzZCi8XiS57nPwEcxmhGdqkaJ2Y+L4ribfCk+/wX06BBgwb9X90DqVQroZsOVoMAAAAASUVORK5CYII="
    />
);

const Circle = () => (
    <img
        alt="circle"
        src="data:image/png;base64,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"
    />
);

const Block: FC = () => {
    const [checked, setChecked] = useState(false);
    return (
        <div onClick={() => setChecked(true)} className={`block ${checked ? 'checked' : ''}`}>
            {checked ? <Circle /> : <Cross />}
        </div>
    );
};

const Board: FC = () => {
    const grid = Array(size)
        .fill(undefined)
        .map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="row">
                {Array(size)
                    .fill(undefined)
                    .map((_, colIndex) => (
                        <Block key={`block ${rowIndex}-${colIndex}`} />
                    ))}
            </div>
        ));
    return <div className="board">{grid}</div>;
};

export default Board;
