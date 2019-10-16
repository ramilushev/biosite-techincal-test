import { Injectable } from 'injection-js';
import {
    chain,
    compact,
    flatten,
    map,
    negate,
    property,
} from 'lodash';
import * as uuid from 'uuid/v4';
import {
    Qualification,
    User,
} from './user-repository.service';


@Injectable()
export class UserMerger {
    public merge(users: User[]): User {

        if (!users.length) {
            throw new Error('Error: users empty!');
        }

        if (users.length === 1) {
            return users[0];
        }

        return {
            id: uuid(),
            firstName: this.mergeNames(map(users, 'firstName')),
            lastName: this.mergeNames(map(users, 'lastName')),
            qualifications: this.mergeQualifications(flatten(map(users, 'qualifications'))),
        };
    }

    private mergeNames(names: string[]) {
        return names.reduce((merged: string, next: string) => {
            const hasSameInitial = merged[0] === next[0];
            const shouldExpandInitials = this.isInitial(merged) && hasSameInitial;

            if (shouldExpandInitials) return next;

            return merged;
        });
    }

    private isInitial(name: string) {
        return /^[A-Z]\.?$/.test(name);
    }

    private mergeQualifications(qualifications: Qualification[]): Qualification[] {
        return chain(qualifications)
            .groupBy('type')
            .values()
            .map(this.resolveDuplicateQualifications.bind(this))
            .flatten()
            .value();
    }

    private resolveDuplicateQualifications(qualifications: Qualification[]): Qualification[] {
        // Checks whether there are qualifications with unique ids
        const withId = qualifications.filter(property('uniqueId'));

        if (qualifications.length === 1 || !withId.length) {
            return [{ ...qualifications[0], id: uuid() }];
        }

        return chain(withId)
            .groupBy('uniqueId')
            .values()
            .map(this.mergeQualificationsByExpiry)
            .flatten()
            .map(this.setNewQualificationId)
            .value();
    }

    private mergeQualificationsByExpiry(qualifications: Qualification[]) {
        const infiniteExpiry = chain(qualifications)
            // Get only null expiry dates
            .filter(negate(property('expiry')))
            .first().value();

        const highestExpiration = chain(qualifications)
            // Get only valid expiry dates
            .filter(property('expiry'))
            // Sort them, as we need only the longest expiry
            .sortBy('expiry')
            .last().value();

        return compact([infiniteExpiry, highestExpiration]);
    }

    private setNewQualificationId(qualification: Qualification) {
        return {
            ...qualification,
            id: uuid(),
        };
    }
}
