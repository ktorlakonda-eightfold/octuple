import React, { FC, Ref } from 'react';
import styles from './matchScore.module.scss';
import { mergeClasses } from '../../shared/utilities';
import { FillType, MatchScoreProps } from './MatchScore.types';

export const MatchScore: FC<MatchScoreProps> = React.forwardRef(
    (
        {
            classNames,
            score = 0,
            total = 5,
            hideLabel = false,
            ariaLabel = 'score',
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const absTotal: number = Math.abs(total);
        const matchScoreClasses = mergeClasses(
            classNames,
            styles.matchScoreContainer
        );
        return (
            <div
                {...rest}
                ref={ref}
                className={matchScoreClasses}
                aria-label={ariaLabel}
            >
                {getArrayOfSize(Math.min(Math.floor(score), absTotal)).map(
                    (_val, index) => (
                        <MatchScoreCircle fill="full" key={index} />
                    )
                )}
                {Math.floor(score) !== score && (
                    <MatchScoreCircle fill="half" />
                )}
                {getArrayOfSize(Math.max(Math.floor(absTotal - score), 0)).map(
                    (_val, index) => (
                        <MatchScoreCircle key={index} />
                    )
                )}
                {!hideLabel && (
                    <p className={styles.label}>
                        {score}/{absTotal}
                    </p>
                )}
            </div>
        );
    }
);

const getArrayOfSize = (n: number) => Array.from(Array(n));

const MatchScoreCircle = ({ fill = 'empty' }: { fill?: FillType }) => (
    <div
        className={mergeClasses([
            styles.matchScoreCircle,
            { [styles.full]: fill === 'full' },
            { [styles.half]: fill === 'half' },
        ])}
    />
);
