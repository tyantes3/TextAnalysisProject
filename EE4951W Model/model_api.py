
from transformers import BartTokenizer, BartForConditionalGeneration, pipeline
import torch

def callLarge(input_text):
    
    summarizer = pipeline("summarization", model="Azma-AI/bart-large-text-summarizer")

    words = input_text.split()  # Split the article into words
    chunk_size = 500
    chunks = []

    current_chunk = []  # Initialize current chunk
    for word in words:
        current_chunk.append(word)
        if (len(current_chunk) >= chunk_size) & ("." in word):
            chunks.append(' '.join(current_chunk))
            current_chunk = []

    # Add any remaining words to the last chunk
    if current_chunk:
        chunks.append(' '.join(current_chunk))

    # Print the chunks
    #for i, chunk in enumerate(chunks, start=1):
        #print(f"Chunk {i}:")
        #print(chunk)
        #print()

    total_summary = []
    for piece in chunks:
    #print(piece)
        summarypiece = summarizer(piece, max_length=150, min_length=30, do_sample=False)
        total_summary.append(summarypiece[0]['summary_text'])

    print(total_summary)
    return total_summary
    
    