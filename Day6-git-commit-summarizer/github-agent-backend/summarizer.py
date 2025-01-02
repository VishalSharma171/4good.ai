from nltk.tokenize import sent_tokenize
from collections import Counter

def summarize_commits(commit_messages):
    # Combine all commit messages
    text = " ".join(commit_messages)

    # Tokenize into sentences
    sentences = sent_tokenize(text)

    # Frequency-based summary
    word_counts = Counter(text.split())
    important_sentences = sorted(sentences, key=lambda s: sum(word_counts[word] for word in s.split()), reverse=True)

    # Return the top 5 most important sentences
    return important_sentences[:5]
