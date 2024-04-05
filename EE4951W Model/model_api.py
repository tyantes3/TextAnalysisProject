
from transformers import BartTokenizer, BartForConditionalGeneration, pipeline
import torch
import requests
from bs4 import BeautifulSoup
import PyPDF2
import io

def callLarge(input_text, input_type, model_type):
    if input_type == "urlInput":
        print("In url parse function")
        url = input_text
        r = requests.get(url)
        content_type = r.headers.get('content-type')

        if 'application/pdf' in content_type:
            ext = '.pdf'
        elif 'text/html' in content_type:
            ext = '.html'
        else:
            ext = ''
            print('Unknown type: {}'.format(content_type))
        if ext == '.html':
        # Fetch the page content
            response = requests.get(url)
            html_content = response.text

            # Parse the HTML content
            soup = BeautifulSoup(html_content, 'html.parser')

            # Extract text from various common HTML tags
            article = ''
            #for tag in soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span', 'a', 'li', 'td', 'th', 'blockquote', 'pre', 'code', 'strong', 'em']):
            for tag in soup.find_all(['p']):
                article += tag.get_text(strip=True) + '\n'

        if ext == '.pdf':
        # Fetch the PDF content
            response = requests.get(url)
            pdf_content = response.content

            # Create a file-like object from the PDF content
            pdf_file = io.BytesIO(pdf_content)

            # Create a PDF file reader object
            pdf_reader = PyPDF2.PdfReader(pdf_file)

            # Extract text from each page of the PDF
            article = ''
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                article += page.extract_text()
        print("article")
        print(article)        
        input_text = article

    if model_type == "Faster":
        summarizer = pipeline("summarization", model="Falconsai/text_summarization")
        print("using fast model")
    else:
        summarizer = pipeline("summarization", model="Azma-AI/bart-large-text-summarizer")
        print("using better model")

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

    

    total_summary = []
    for piece in chunks:
    
        summarypiece = summarizer(piece, max_length=150, min_length=30, do_sample=False)
        total_summary.append(summarypiece[0]['summary_text'])
    print(total_summary)
    
    return total_summary
    
    