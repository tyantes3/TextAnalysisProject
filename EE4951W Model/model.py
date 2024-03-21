Article = """Harry Potter is a series of seven fantasy novels written by British author J.K. Rowling. The story primarily revolves around a young wizard named Harry Potter and his journey through the wizarding world. Below is a 1000-word summary of the entire series:

In the first book, "Harry Potter and the Philosopher's Stone" (also known as "Harry Potter and the Sorcerer's Stone" in the United States), we are introduced to Harry Potter, an orphan who learns on his eleventh birthday that he is a wizard. He is invited to attend Hogwarts School of Witchcraft and Wizardry, where he makes friends with Ron Weasley and Hermione Granger. Together, they uncover a plot to steal the Philosopher's Stone, a powerful magical object that grants immortality. With the help of their friends and teachers, including Headmaster Albus Dumbledore, they prevent the stone from falling into the hands of the dark wizard Voldemort, who killed Harry's parents and attempted to kill Harry as an infant.

In "Harry Potter and the Chamber of Secrets," Harry returns to Hogwarts for his second year and discovers that the Chamber of Secrets has been opened, unleashing a monster that petrifies students. Harry learns that he can speak Parseltongue, the language of snakes, which leads some to suspect him of being involved. With the help of Ron, Hermione, and a diary belonging to a former student named Tom Riddle, Harry defeats the monster and saves Ginny Weasley, Ron's sister, who had been possessed by Voldemort's soul fragment contained within the diary.

"Harry Potter and the Prisoner of Azkaban" sees Harry learning more about his parents' past and the circumstances of their deaths. He also encounters Sirius Black, a prisoner who has escaped from the wizarding prison of Azkaban and is believed to be a supporter of Voldemort. As Harry learns the truth about Sirius and his connection to his family, he also discovers that the real traitor is Peter Pettigrew, who had been masquerading as Ron's pet rat. Harry and his friends prevent Pettigrew and the soul-sucking Dementors from harming Sirius.

In "Harry Potter and the Goblet of Fire," Harry is unexpectedly entered into the Triwizard Tournament, a dangerous magical competition between three wizarding schools. Despite being underage and facing numerous challenges, Harry navigates the tournament with the help of his friends. However, during the final task, he is transported to a graveyard where Voldemort is restored to his physical form. Cedric Diggory, a fellow competitor, is killed, and Harry narrowly escapes with the help of his parents' spirits. The return of Voldemort signals the beginning of a new era of darkness and danger.

"Harry Potter and the Order of the Phoenix" sees Harry struggling with the trauma of witnessing Cedric's death and the skepticism of the wizarding community regarding Voldemort's return. He forms Dumbledore's Army, a secret group to teach defensive magic, after the Ministry of Magic installs Dolores Umbridge as Hogwarts' Defense Against the Dark Arts teacher and refuses to acknowledge Voldemort's return. Harry also learns about a prophecy stating that he and Voldemort are destined to face each other. The climax involves a battle at the Ministry of Magic, where Harry and his friends confront Voldemort's followers, the Death Eaters.

In "Harry Potter and the Half-Blood Prince," Dumbledore begins to prepare Harry for his eventual confrontation with Voldemort by providing him with information about the dark wizard's Horcruxes—objects containing fragments of his soul that grant him immortality. Meanwhile, Harry learns about Voldemort's past, including his birth as Tom Riddle and his transformation into the Dark Lord. As Harry and Dumbledore search for Horcruxes, Draco Malfoy is tasked with carrying out a secret mission for Voldemort within Hogwarts. The book ends tragically with the death of Dumbledore at Snape's hands.

The final book, "Harry Potter and the Deathly Hallows," follows Harry, Ron, and Hermione as they go on a quest to find and destroy the remaining Horcruxes, which are the key to defeating Voldemort. Along the way, they face numerous obstacles and dangers, including betrayal, capture, and loss. They discover the existence of the Deathly Hallows, three powerful magical objects that together can make the wielder the Master of Death. In a climactic battle at Hogwarts, Harry sacrifices himself to destroy the final Horcrux and is temporarily transported to a surreal realm where he confronts Dumbledore and makes the choice to return and defeat Voldemort. With the help of his loved ones and the support of the wizarding world, Harry ultimately triumphs over Voldemort, ending his reign of terror once and for all. The series concludes with an epilogue set nineteen years later, showing Harry, Ron, Hermione, and their friends sending their own children off to Hogwarts, symbolizing a new era of peace and hope in the wizarding world.
"""

summary = summarizer(Article,max_length=150, min_length=30, do_sample=False)

# Convert summary to a list of sentences
summary_sentences = summary[0]['summary_text'].split(". ")

# Define the maximum number of characters per line
max_chars_per_line = 80

# Initialize an empty list to hold the formatted lines of the summary
formatted_lines = []

# Iterate through each sentence in the summary
for sentence in summary_sentences:
    words = sentence.split()
    current_line = ""

    # Split the sentence into lines with a maximum number of characters per line
    for word in words:
        if len(current_line) + len(word) + 1 <= max_chars_per_line:
            current_line += word + " "
        else:
            formatted_lines.append(current_line.strip())
            current_line = word + " "

    # Add the remaining part of the sentence to the last line
    if current_line:
        formatted_lines.append(current_line.strip())

# Join the lines with line breaks
formatted_summary = '\n'.join(formatted_lines)

print(formatted_summary)

# from transformers import pipeline

# summarizer = pipeline("text2text-generation", model="Falconsai/text_summarization")
# Article = """Harry Potter, the central figure in J.K. Rowling's renowned series, embarks on an extraordinary odyssey from his modest beginnings as an orphan to his heroic role as a wizard. Initiated into the world of magic at age eleven, Harry enters Hogwarts School of Witchcraft and Wizardry, where he forges enduring bonds with companions Ron Weasley and Hermione Granger. Together, they navigate the intricacies of school life while facing myriad challenges, including the ominous return of the dark wizard Voldemort. Harry's narrative is one of resilience, friendship, and the ultimate victory of good over evil, culminating in a climactic confrontation with Voldemort. Along his journey, Harry absorbs profound lessons about love, loyalty, and the strength found in unity, captivating readers with his unwavering determination and courage. Rowling's spellbinding storytelling transports audiences to a realm brimming with enchantment, where Harry's saga serves as a timeless testament to the enduring power of hope and the indomitable human spirit, resonating with readers of all ages across the globe.
# """
# summary = summarizer(Article, max_length=250, min_length=30, do_sample=False)

# # Extract summary text from the output
# summary_text = summary[0]['generated_text']

# # Split summary text into sentences
# summary_sentences = summary_text.split(". ")

# # Define the maximum number of characters per line
# max_chars_per_line = 80

# # Initialize an empty list to hold the formatted lines of the summary
# formatted_lines = []

# # Iterate through each sentence in the summary
# for sentence in summary_sentences:
#     words = sentence.split()
#     current_line = ""

#     # Split the sentence into lines with a maximum number of characters per line
#     for word in words:
#         if len(current_line) + len(word) + 1 <= max_chars_per_line:
#             current_line += word + " "
#         else:
#             formatted_lines.append(current_line.strip())
#             current_line = word + " "

#     # Add the remaining part of the sentence to the last line
#     if current_line:
#         formatted_lines.append(current_line.strip())

# # Join the lines with line breaks
# formatted_summary = '\n'.join(formatted_lines)

# print(formatted_summary)