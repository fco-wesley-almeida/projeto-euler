
import { db, Timestamp } from '../config';
import firebase from 'firebase';
import { TutorialCase } from '@/firebase/models/case';
import { Group } from "@/firebase/models/group";

export const createGroups = (caseID: string, groups: Array<Group>): Promise<void> => {
  let batch = db.batch();
  for (var group of groups) {
    let ref = db.collection("cases").doc(caseID).collection("groups").doc();
    batch.set(ref, group.toObject());
  }
  batch.update(db.collection("cases").doc(caseID), { status: "active", creationDate: Timestamp.fromDate(new Date()) })
  return batch.commit();
};
