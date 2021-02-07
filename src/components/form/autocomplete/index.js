import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import PropTypes from 'prop-types';

import { removeAccents } from 'utils/removeAccents';

import styles from './index.module.scss';

const Autocomplete = ({
	onSelectItem,
	inputOptions,
	source,
	characters,
	onBlurSelected,
	id,
	placeholder,
	error,
}) => {
	const [suggestions, setSuggestions] = useState(source || []);
	const [highlightedSuggestion, setHighlightedSuggestion] = useState({
		text: '',
	});
	const [suggestionsDisplayed, setSuggestionsDisplayed] = useState(false);
	const [selected, setSelected] = useState('');

	const getSuggestionValue = suggestion => {
		setSuggestionsDisplayed(false);
		onSelectItem(suggestion, id);
		return suggestion.text;
	};

	const renderSuggestion = (suggestion, { query, isHighlighted }) => {
		const matches = match(suggestion.text, query);
		const parts = parse(suggestion.text, matches);

		return (
			<div
				data-testid='menu-item'
				className={
					isHighlighted
						? `${styles.menuItem} ${styles.selected}`
						: styles.menuItem
				}
			>
				<div>
					{parts.map((part, index) => {
						return part.highlight ? (
							<span key={index} className={styles.highlightSpan}>
								{part.text}
							</span>
						) : (
							<strong key={index} className={styles.span}>
								{part.text}
							</strong>
						);
					})}
				</div>
			</div>
		);
	};

	const renderSuggestionsContainer = options => {
		const { containerProps, children } = options;

		return <div {...containerProps}>{children}</div>;
	};

	const renderInput = inputProps => {
		const { classes, ref, ...other } = inputProps;
		const style = suggestionsDisplayed
			? `${styles.input} ${styles.borders}`
			: styles.input;

		const inputStatusStyle = !source
			? `${style} ${styles.inputDisabled}`
			: style;

		return (
			<div>
				<input
					ref={ref}
					className={
						error.status
							? `${inputStatusStyle} ${styles.inputError}`
							: inputStatusStyle
					}
					{...other}
				/>
				{error.status && (
					<span className={styles.errorMessage}>{error.message}</span>
				)}
			</div>
		);
	};

	const getSuggestions = inputValue => {
		return source
			?.filter(suggestion => suggestion.text.toLowerCase().includes(inputValue))
			.slice(0, 10);
	};

	const onSuggestionsFetchRequested = ({ value }) => {
		if (!value) return [];
		const inputValue = removeAccents(value.trim().toLowerCase());
		const inputLength = inputValue.length;
		if (inputLength < characters) return [];

		const suggestions = getSuggestions(inputValue);
		setSuggestionsDisplayed(true);
		setSuggestions(suggestions);
	};

	const handleChange = (event, { newValue }) => {
		if (newValue === '') {
			onSelectItem(null, id);
			setSuggestionsDisplayed(false);
		}

		setSelected(newValue);
	};

	const handleBlur = () => {
		setSuggestionsDisplayed(false);

		if (onBlurSelected && highlightedSuggestion) {
			setSelected(highlightedSuggestion.text);
			onSelectItem(highlightedSuggestion, id);
		}
	};

	const handleClick = event => {
		event.target.select();
	};

	const shouldRenderSuggestions = value => characters <= value.length;
	const getSectionSuggestions = section => section.suggestions;

	return (
		<Autosuggest
			theme={{
				container: styles.container,
				suggestionsContainerOpen: styles.suggestionsContainerOpen,
				suggestionsList: styles.suggestionsList,
				suggestion: styles.suggestion,
			}}
			renderInputComponent={renderInput}
			suggestions={suggestions}
			onSuggestionsFetchRequested={onSuggestionsFetchRequested}
			renderSuggestionsContainer={renderSuggestionsContainer}
			highlightFirstSuggestion
			getSuggestionValue={getSuggestionValue}
			renderSuggestion={renderSuggestion}
			shouldRenderSuggestions={shouldRenderSuggestions}
			onSuggestionsClearRequested={() => setSuggestions([])}
			onSuggestionHighlighted={({ suggestion }) =>
				setHighlightedSuggestion(suggestion)
			}
			inputProps={{
				value: selected,
				onChange: handleChange,
				onClick: handleClick,
				onBlur: handleBlur,
				placeholder,
				...inputOptions,
				'data-testid': 'input-text',
			}}
			getSectionSuggestions={getSectionSuggestions}
		/>
	);
};

Autocomplete.defaultProps = {
	characters: 2,
};

Autocomplete.prototypes = {
	onSelectItem: PropTypes.func,
	inputOptions: PropTypes.shape({}),
	source: PropTypes.arrayOf(),
	characters: PropTypes.number,
	id: PropTypes.string,
	onBlurSelected: PropTypes.func,
	placeholder: PropTypes.string,
};

export default Autocomplete;
