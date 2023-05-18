NC='\033[0m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'

value=`cat cypress-runner.txt`

IFS="|"

read -ra ADDR <<<"$value"

baseCommand="npx cypress run --headed --browser electron --spec "
runnerCommand=""

current=0
length=${#ADDR[@]}

clear
echo -e "${GREEN}Below spec files / folder will be run serially.\n${NC}"

for i in "${ADDR[@]}";
do
current=$((current + 1))
echo "spec : $i"
if [[ "$current" -eq "$length" ]]
then
   runnerCommand=$runnerCommand$baseCommand$i
else
   runnerCommand="$runnerCommand$baseCommand$i && sleep 1 && "
fi
done

echo -e "${YELLOW}\nWhich browser you want to run ? ( default is electron )${NC}"
read browser

if [[ $browser -eq '' ]]
then
   final=$runnerCommand
else
   final="${runnerCommand//electron/$browser}"
fi

echo -e "\n$final\n"

eval $final