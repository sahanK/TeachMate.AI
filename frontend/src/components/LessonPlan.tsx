import { Dispatch, SetStateAction, useMemo } from "react";
import { BookmarkIcon, ShareIcon, DocumentIcon } from '@heroicons/react/24/outline'

type LessonPlanProps = {
  isLessonPlanVisible: boolean;
  setIsLessonPlanVisible: Dispatch<SetStateAction<boolean>>
};

const LessonPlan: React.FC<LessonPlanProps> = ({ isLessonPlanVisible, setIsLessonPlanVisible }) => {
  const response: PredictAPIResponse = {
    "lesson_plan": {
        "choices": [
            {
                "finish_reason": "stop",
                "index": 0,
                "message": {
                    "content": "Grade: 6\nSubject: Mathematics\nTopic: Circles\n\nLesson Objectives:\n1. Students will be able to identify circular shapes.\n2. Students will be able to create circular designs using coins and rings.\n\nMaterials:\n- Whiteboard or blackboard\n- Markers or chalk\n- Coins of different sizes\n- Rings of different sizes\n- Chart paper\n- Team quiz questions (prepared in advance)\n\nProcedure:\n\nIntroduction (10 minutes):\n1. Begin the lesson by asking students if they know what a circle is. Write their responses on the board.\n2. Explain that a circle is a shape that is perfectly round and has no corners or edges.\n3. Show examples of circular objects such as coins, rings, and plates.\n4. Ask students to identify other circular objects they can think of and write them on the board.\n\nActivity 1: Identifying Circular Shapes (15 minutes):\n1. Divide the class into teams of 4-5 students each.\n2. Distribute chart paper and markers to each team.\n3. Explain that each team will have 5 minutes to go around the classroom and find as many circular objects as they can.\n4. Instruct the teams to draw the objects they find on their chart paper.\n5. After 5 minutes, have each team present their findings to the class. Discuss the objects and confirm if they are indeed circular shapes.\n\nActivity 2: Creating Circular Designs (20 minutes):\n1. Distribute coins and rings of different sizes to each team.\n2. Explain that each team will have 10 minutes to create a circular design using the coins and rings.\n3. Encourage creativity and remind students to use different sizes and arrangements to create their designs.\n4. After 10 minutes, have each team present their designs to the class. Discuss the different designs and ask students to explain their choices.\n\nTeam Quiz (15 minutes):\n1. Prepare a set of team quiz questions related to circles in advance.\n2. Explain that each team will take turns answering the questions.\n3. Each team will have 1 minute to discuss and write their answer on a piece of paper.\n4. After 1 minute, collect the answers and reveal the correct answer.\n5. Award points to each team based on their correct answers.\n6. Repeat this process for all the questions.\n\nConclusion (5 minutes):\n1. Recap the main points of the lesson, emphasizing the identification of circular shapes and the creation of circular designs.\n2. Ask students if they have any questions or if there is anything they would like to share about the lesson.\n3. Assign a small homework task, such as finding and drawing three more circular objects at home.\n\nNote: Adjust the timings of the activities based on the pace of the class and the available time.",
                    "role": "assistant"
                }
            }
        ],
        "created": 1691946478,
        "id": "chatcmpl-7n8rGNIbbiBOcrVi6q95QgkcS6cr4",
        "model": "gpt-3.5-turbo-0613",
        "object": "chat.completion",
        "usage": {
            "completion_tokens": 561,
            "prompt_tokens": 45,
            "total_tokens": 606
        }
    },
    "teaching_aid": "Team Quiz",
    "teaching_aid_category": "Kinesthetic"
  };

  const sections: string[][] = useMemo(() => {
    let currentSection: string[] = [];
    let sections: string[][] = [];
    const split1 = response.lesson_plan.choices[0].message.content.split('\n');
    split1.forEach(item => {
      if (item === '') {
        sections.push(currentSection);
        currentSection = [];
      } else {
        currentSection.push(item)
      }
    })
    console.log(sections)
    return sections;
  }, []);

  return (
    <div className="flex-1 flex-col">
      {
        sections.map((section) => {
          return (
            <div className="flex flex-col my-[16px]">
              {
                section.map((item, itemIndex) => {
                  if (item === 'Procedure:') {
                    return (
                      <div className="flex flex-row items-center space-x-10 p-2 rounded-full border-2 border-gray-200">
                        <h2 className="text-[24px] font-bold border-2 border-amber-300 rounded-full p-2">{response.teaching_aid}</h2>
                        <BookmarkIcon className="h-8 w-8 rounded-full p-[5px] border-2 border-amber-400 hover:bg-amber-400 hover:scale-125 hover:transition hover:duration-300 hover:text-white active:scale-150" />
                        <ShareIcon className="h-8 w-8 rounded-full p-[5px] border-2 border-amber-400 hover:bg-amber-400 hover:scale-125 hover:transition hover:duration-300 hover:text-white active:scale-150" />
                        <DocumentIcon className="h-8 w-8 rounded-full p-[5px] border-2 border-amber-400 hover:bg-amber-400 hover:scale-125 hover:transition hover:duration-300 hover:text-white active:scale-150" />
                      </div>
                    )
                  }
                  if (itemIndex === 0) {
                    return <h2 className="text-[16px] font-semibold">{item}</h2>
                  }
                  return <p className="text-[14px] text-gray-600">{item}</p>
                })
              }
            </div>
          )
        })
      }
      <div className='flex-1 flex justify-end'>
        <button
          className='w-[400px] h-[50px] bg-amber-400 text-white hover:bg-amber-500 rounded-xl focus:border-amber-800'
          onClick={(event) => {
            event.preventDefault()
            setIsLessonPlanVisible(false)
          }}
        >
          CREATE ANOTHER
        </button>
      </div>
    </div>
  );
};

export default LessonPlan;